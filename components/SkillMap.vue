<script lang="ts" async setup>
import { computed } from "vue";
import { voronoiTreemap } from "d3-voronoi-treemap";
import type { HierarchyNode } from "d3";
import * as d3 from "d3";
import { random } from "colord";
import type { Skill } from "#imports";
import { useCv } from "#imports";
const cv = useCv();
const statistics = await cv.getStatistics();

const types = computed(() =>
  Array.from(new Set(statistics.value.skills?.map((s) => s.kind))),
);
const typesColors = computed(() =>
  types.value.reduce(
    (acc, type, i) => ({ ...acc, [type]: random().toHex() }),
    {} as Record<string, string>,
  ),
);
const canvasWidth = ref(960);
const canvasHeight = ref(960);
const margin = { top: 10, right: 10, bottom: 10, left: 10 };
const width = canvasWidth.value;
const height = canvasHeight.value;
const halfWidth = width / 2;
const halfHeight = height / 2;
const treemapRadius = 205;
const treemapCenter = [halfWidth, halfHeight + 5];
const circlePolygon = (radius: number) => {
  const points = 60,
    increment = (Math.PI * 2) / points,
    circlingPolygon = [];
  for (let a = 0, i = 0; i < points; i++, a += increment) {
    circlingPolygon.push([
      radius + radius * Math.cos(a),
      radius + radius * Math.sin(a),
    ]);
  }
  return circlingPolygon;
};

const fontScale = d3.scaleLinear();
fontScale.domain([3, 10]).range([3, 20]).clamp(true);

onMounted(() => {
  // entrepreneurship, leadership, technical, business
  const groups = d3.group(
    // statistics.value.skills.filter((s: Skill) => s.category === "engineering"),
    statistics.value.skills,
    (d: Skill) => d.kind,
  );
  const svg = d3
    .select("#skills-map")
    .attr("width", canvasWidth.value)
    .attr("height", canvasHeight.value);

  const drawingArea = svg
    .append("g")
    .attr("id", "drawing-area")
    .classed("drawing-area", true);
  // .attr("transform", `translate(${margin.left},${margin.top})`)

  const treeMapContainer = drawingArea
    .append("g")
    .attr("id", "treemap-container")
    .classed("treemap-container", true);
  // .attr("transform", `translate(${treemapCenter})`)
  // treeMapContainer
  //   .append("path")
  //   .classed("world", true)
  //   // .attr("d", (d: HierarchyNode<Skill>) => `M${d.polygon.join(",")}z`)
  //   .style("fill", "none")
  //   .style("stroke", "white")
  //   .style("stroke-width", 2);
  // .attr("transform", `translate(${[-treemapRadius, -treemapRadius]})`)
  // .attr("d", "M" + circlePolygon.join(",") + "Z")

  const hierarchy = d3.hierarchy(groups).sum((d: Skill) => d.totalHours);
  // voronoi.clip(circlePolygon)(hierarchy);
  voronoiTreemap().clip([
    [0, 0],
    [0, height],
    [width, height],
    [width, 0],
  ])(hierarchy);

  const leaves = hierarchy.leaves();
  const cells = treeMapContainer
    .append("g")
    .attr("id", "cells")
    .classed("cells", true)
    // .attr("transform", `translate(${[-treemapRadius, -treemapRadius]})`)
    .selectAll(".cell")
    .data(leaves)
    .enter()
    .append("g")
    .classed("cell", true)
    .attr("d", function (d: HierarchyNode<Skill>) {
      return "M" + d.polygon.join(",") + "z";
    })
    .style("fill", function (d: HierarchyNode<Skill>) {
      return typesColors.value[d.data.kind];
    });

  cells
    .append("path")
    .classed("cell", true)
    .attr("d", (d: HierarchyNode<Skill>) => `M${d.polygon.join(",")}z`);

  // Append the border
  cells
    .append("path")
    .classed("cell-border", true)
    .attr("d", (d: HierarchyNode<Skill>) => `M${d.polygon.join(",")}z`)
    .style("fill", "none")
    .style("stroke", "white")
    .style("stroke-width", 2);

  const labels = treeMapContainer
    .append("g")
    .classed("labels", true)
    // .attr("transform", `translate(${[-treemapRadius, -treemapRadius]})`)
    .selectAll(".label")
    .data(leaves)
    .enter()
    .append("g")
    .classed("label", true)
    .attr("transform", function (d: HierarchyNode<Skill>) {
      return "translate(" + [d.polygon.site.x, d.polygon.site.y] + ")";
    });

  labels
    .append("text")
    .classed("name", true)
    .classed("text-sm", true)
    .html(function (d: HierarchyNode<Skill>) {
      return d.data.name.length > 7
        ? d.data.name.slice(0, 7) + "..."
        : d.data.name;
    })
    .each(function (d: HierarchyNode<Skill>) {
      const bbox = this.getBBox();
      const cbbox = this.parentNode.getBBox();
      const scale = Math.min(
        cbbox.width / bbox.width,
        cbbox.height / bbox.height,
      );
      d.scale = scale;
      d3.select(this).attr("transform", "scale(" + scale + ")");
    })
    .style("font-size", function (d: HierarchyNode<Skill>) {
      return fontScale(d.scale + "em"); //fontScale(d.data.total_hours / 3000);
    });

  // .style("font-size", function (d: HierarchyNode<Skill>) {
  //   console.log(d.data.name, d.scale);
  //   return fontScale(d.data.total_hours / d.scale); //fontScale(d.data.total_hours / 3000);
  // })
  // labels
  //   .append("text")
  //   .classed("value", true)
  //   .html(function (d: HierarchyNode<Skill>) {
  //     return d.data.totalHours;
  //   });
  // .each(function (d: HierarchyNode<Skill>) {
  //   const bbox = this.getBBox();
  //   const cbbox = this.parentNode.getBBox();
  //   const scale = Math.min(
  //     cbbox.width / bbox.width,
  //     cbbox.height / bbox.height,
  //   );
  //   // console.log(d.data.name, bbox, cbbox, scale);
  //   d.scale = scale;
  //   d3.select(this).attr("transform", "scale(" + scale + ")");
  // })
  // .style("font-size", function (d: HierarchyNode<Skill>) {
  //   return fontScale(d.data.totalHours / 1000); //fontScale(d.data.total_hours / 3000);
  // })

  const hoverers = treeMapContainer
    .append("g")
    .classed("hoverers", true)
    // .attr("transform", "translate(" + [-treemapRadius, -treemapRadius] + ")")
    .selectAll(".hoverer")
    .data(leaves)
    .enter()
    .append("path")
    .classed("hoverer", true)
    .attr("d", function (d: HierarchyNode<Skill>) {
      return "M" + d.polygon.join(",") + "z";
    });

  hoverers.append("title").text(function (d: HierarchyNode<Skill>) {
    return (
      d.data.name +
      "\n" +
      d.data.type +
      "\n" +
      d.data.kind +
      "\n" +
      d.data.totalHours
    );
  });
});
</script>

<template>
  <div>
    <ul class="overflow-auto max-w-4xl mx-auto">
      <li
        v-for="type in types"
        :key="type"
        :style="'color: ' + typesColors[type]"
        class="inline mr-2 text-sm"
      >
        {{ type }}
      </li>
    </ul>
    <svg id="skills-map" class="mx-auto"></svg>
  </div>
</template>

<style lang="postcss">
#skills-map {
  text.tiny {
    font-size: 10pt;
  }

  text.light {
    fill: lightgrey;
  }

  .world {
    stroke: lightgrey;
    stroke-width: 4px;
  }

  .cell {
    stroke: yellowgreen;
    stroke-width: 1px;
  }

  .label {
    text-anchor: middle;
    fill: white;
  }

  .name {
    text-overflow: ellipsis;
  }

  .label > .name {
    dominant-baseline: text-after-edge;
    color: blue;
  }

  .label > .value {
    dominant-baseline: text-before-edge;
    color: blue;
  }

  .hoverer {
    fill: transparent;
    stroke: darkred;
    stroke-width: 0;
  }

  .hoverer > title {
    text-overflow: ellipsis;
    font-size: 10pt;
  }

  .hoverer:hover {
    stroke-width: 3px;
  }

  .legend-color {
    stroke-width: 1px;
    stroke: darkgrey;
  }
}
</style>
