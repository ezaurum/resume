<script setup lang="ts">
import * as d3 from 'd3'
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { GraphNode, GraphEdge, EntityType } from '@/types'
import { ENTITY_COLORS, NODE_SIZES } from '@/types'

const props = defineProps<{
  nodes: GraphNode[]
  edges: GraphEdge[]
  visibleTypes?: Set<EntityType>
}>()

const emit = defineEmits<{
  'node-click': [node: GraphNode]
}>()

const svgRef = ref<SVGSVGElement>()
const containerRef = ref<HTMLDivElement>()
const tooltip = ref<{ visible: boolean; x: number; y: number; node: GraphNode | null }>({
  visible: false, x: 0, y: 0, node: null
})

const router = useRouter()

type SimNode = GraphNode & d3.SimulationNodeDatum
type SimEdge = { source: SimNode; target: SimNode; relation: string }

let simulation: d3.Simulation<SimNode, SimEdge> | null = null

const visibleNodes = computed(() => {
  if (!props.visibleTypes) return props.nodes
  return props.nodes.filter(n => props.visibleTypes!.has(n.type))
})

const visibleEdges = computed(() => {
  const nodeIds = new Set(visibleNodes.value.map(n => n.id))
  return props.edges.filter(e => {
    const src = typeof e.source === 'string' ? e.source : (e.source as GraphNode).id
    const tgt = typeof e.target === 'string' ? e.target : (e.target as GraphNode).id
    return nodeIds.has(src) && nodeIds.has(tgt)
  })
})

// Store zoom/svg refs for external zoom controls
const zoomRef = ref<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null)
const svgSelectionRef = ref<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null)
const dimensionsRef = ref({ width: 0, height: 0 })

function initGraph() {
  if (!svgRef.value || !containerRef.value) return

  const width = containerRef.value.clientWidth
  const height = containerRef.value.clientHeight

  dimensionsRef.value = { width, height }

  // Clear previous
  d3.select(svgRef.value).selectAll('*').remove()
  if (simulation) {
    simulation.stop()
    simulation = null
  }

  const svg = d3.select(svgRef.value)
    .attr('width', width)
    .attr('height', height)

  svgSelectionRef.value = svg

  // Zoom
  const g = svg.append('g')
  const zoom = d3.zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.1, 4])
    .on('zoom', (event) => {
      g.attr('transform', event.transform)
    })
  svg.call(zoom)
  zoomRef.value = zoom

  // Build copies for simulation
  const nodes: SimNode[] = visibleNodes.value.map(n => ({ ...n } as SimNode))
  const nodeMap = new Map(nodes.map(n => [n.id, n]))

  const edges: SimEdge[] = []
  visibleEdges.value.forEach(e => {
    const src = typeof e.source === 'string' ? e.source : (e.source as GraphNode).id
    const tgt = typeof e.target === 'string' ? e.target : (e.target as GraphNode).id
    const srcNode = nodeMap.get(src)
    const tgtNode = nodeMap.get(tgt)
    if (srcNode && tgtNode) {
      edges.push({ source: srcNode, target: tgtNode, relation: e.relation })
    }
  })

  // Simulation
  simulation = d3.forceSimulation<SimNode, SimEdge>(nodes)
    .force('link', d3.forceLink<SimNode, SimEdge>(edges)
      .id((d) => d.id)
      .distance(d => {
        const src = d.source as SimNode
        const tgt = d.target as SimNode
        if (src.type === 'person' || tgt.type === 'person') return 150
        if (src.type === 'company' || tgt.type === 'company') return 100
        return 70
      })
      .strength(0.3)
    )
    .force('charge', d3.forceManyBody<SimNode>().strength(d => {
      if (d.type === 'person') return -800
      if (d.type === 'company') return -400
      if (d.type === 'project') return -200
      return -100
    }))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide<SimNode>().radius(d => NODE_SIZES[d.type] + 15))

  // Draw edges
  const link = g.append('g')
    .selectAll<SVGLineElement, SimEdge>('line')
    .data(edges)
    .join('line')
    .attr('stroke', '#E8EAED')
    .attr('stroke-width', 1.5)
    .attr('stroke-opacity', 0.6)

  // Draw nodes
  const node = g.append('g')
    .selectAll<SVGGElement, SimNode>('g')
    .data(nodes)
    .join('g')
    .attr('cursor', 'pointer')
    .call(
      d3.drag<SVGGElement, SimNode>()
        .on('start', (event, d) => {
          if (!event.active) simulation?.alphaTarget(0.3).restart()
          d.fx = d.x
          d.fy = d.y
        })
        .on('drag', (event, d) => {
          d.fx = event.x
          d.fy = event.y
        })
        .on('end', (event, d) => {
          if (!event.active) simulation?.alphaTarget(0)
          d.fx = null
          d.fy = null
        })
    )

  // Circle
  node.append('circle')
    .attr('r', d => NODE_SIZES[d.type])
    .attr('fill', d => ENTITY_COLORS[d.type] + 'CC')
    .attr('stroke', d => ENTITY_COLORS[d.type])
    .attr('stroke-width', 2)

  // Labels for person and company
  node.filter(d => d.type === 'person' || d.type === 'company')
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', d => NODE_SIZES[d.type] + 14)
    .attr('font-size', d => d.type === 'person' ? '13px' : '11px')
    .attr('font-weight', d => d.type === 'person' ? 'bold' : 'normal')
    .attr('fill', '#202124')
    .text(d => d.name.length > 8 ? d.name.slice(0, 8) + '...' : d.name)

  // Hover events
  node
    .on('mouseenter', (event: MouseEvent, d: SimNode) => {
      const rect = containerRef.value!.getBoundingClientRect()
      tooltip.value = {
        visible: true,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        node: d
      }
      d3.select(event.currentTarget as SVGGElement)
        .select('circle')
        .attr('stroke-width', 3)
        .attr('r', NODE_SIZES[d.type] * 1.2)
    })
    .on('mouseleave', (event: MouseEvent, d: SimNode) => {
      tooltip.value.visible = false
      d3.select(event.currentTarget as SVGGElement)
        .select('circle')
        .attr('stroke-width', 2)
        .attr('r', NODE_SIZES[d.type])
    })
    .on('click', (_event: MouseEvent, d: SimNode) => {
      emit('node-click', d)
      router.push({ name: 'entity', params: { id: d.id } })
    })

  // Tick
  simulation.on('tick', () => {
    link
      .attr('x1', d => (d.source as SimNode).x ?? 0)
      .attr('y1', d => (d.source as SimNode).y ?? 0)
      .attr('x2', d => (d.target as SimNode).x ?? 0)
      .attr('y2', d => (d.target as SimNode).y ?? 0)

    node.attr('transform', d => `translate(${d.x ?? 0},${d.y ?? 0})`)
  })
}

function zoomIn() {
  const zoom = zoomRef.value
  const svg = svgSelectionRef.value
  if (zoom && svg) {
    svg.transition().call(zoom.scaleBy, 1.3)
  }
}

function zoomOut() {
  const zoom = zoomRef.value
  const svg = svgSelectionRef.value
  if (zoom && svg) {
    svg.transition().call(zoom.scaleBy, 0.77)
  }
}

function resetZoom() {
  const zoom = zoomRef.value
  const svg = svgSelectionRef.value
  const { width, height } = dimensionsRef.value
  if (zoom && svg) {
    svg.transition().call(
      zoom.transform,
      d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8)
    )
  }
}

defineExpose({ zoomIn, zoomOut, resetZoom })

watch(() => [props.nodes, props.edges, props.visibleTypes], () => {
  initGraph()
}, { deep: true })

onMounted(() => {
  initGraph()
  window.addEventListener('resize', initGraph)
})

onUnmounted(() => {
  simulation?.stop()
  window.removeEventListener('resize', initGraph)
})
</script>

<template>
  <div ref="containerRef" class="relative w-full h-full bg-gray-50">
    <svg ref="svgRef" class="w-full h-full"></svg>

    <!-- Tooltip -->
    <div
      v-if="tooltip.visible && tooltip.node"
      class="absolute pointer-events-none z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs"
      :style="{ left: tooltip.x + 12 + 'px', top: tooltip.y - 10 + 'px' }"
    >
      <div class="flex items-center gap-2 mb-1">
        <span
          class="inline-block w-2 h-2 rounded-full"
          :style="{ backgroundColor: ENTITY_COLORS[tooltip.node.type] }"
        ></span>
        <span class="text-xs text-gray-500">{{ tooltip.node.type }}</span>
      </div>
      <div class="font-medium text-sm text-gray-800">{{ tooltip.node.name }}</div>
      <div class="text-xs text-gray-500 mt-0.5">{{ tooltip.node.description }}</div>
    </div>
  </div>
</template>
