<script setup lang="ts">
const nameInitial = ref({ x: 0, y: 0, opacity: 0 });
const nameFinal = ref({
  x: 30,
  y: 0,
  opacity: 1,
  transition: { delay: 2000, duration: 1000 },
});
type IconState = {
  icon: string;
  initial: {
    x: number;
    y: number;
    scale: number;
    rotate: number;
    opacity: number;
  };
  final: {
    x: number;
    y: number;
    scale: number;
    rotate: number;
    opacity: number;
    transition: {
      type: string;
      damping: number;
      stiffness: number;
      mass: number;
    };
  };
};
const name = ref<HTMLElement>({} as HTMLElement);
const iconStates = ref<IconState[]>([]);

let divX = 0;
let divY = 0;
let divWidth = 0;
let divHeight = 0;

const icons = ref([
  "devicon-plain:java",
  "devicon-plain:python",
  "nonicons:javascript-16",
  "arcticons:sqlite-editor",
  "simple-icons:numpy",
  "devicon-plain:pandas-wordmark",
  "simple-icons:tensorflow",
  "devicon-plain:keras",
  "simple-icons:pytorch",
  "simple-icons:scikitlearn",
  "logos:flask",
  "devicon-plain:spring",
]);

onMounted(() => {
  divX = name.value.offsetLeft;
  divY = name.value.offsetTop;
  const avatar = document.getElementById("avatar");
  divX = avatar?.offsetLeft || divX;
  divY = avatar?.offsetTop || divY;
  divWidth = avatar?.offsetWidth;
  divHeight = avatar?.offsetHeight;
  let angle = 0;
  let radius = divWidth / 2 + 20;
  const angleStep = 360 / icons.value.length;

  for (let i = 0; i < icons.value.length; i++) {
    const { x, y } = calculateCoordinates(
      divX + divWidth / 2,
      divY + divHeight / 2,
      radius,
      angle,
    );
    iconStates.value.push({
      icon: icons.value[i],
      initial: generateInitial(),
      final: generateFinal(x, y),
    });
    angle += angleStep;
    if (i > 0 && i % icons.value.length === 0) {
      radius += 10; // Adjust the value as needed
    }
  }
});

function calculateCoordinates(
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number,
): { x: number; y: number } {
  const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180); // Offset for unit circle 0° at 3 o'clock
  const x = cx + radius * Math.cos(angleInRadians);
  const y = cy + radius * Math.sin(angleInRadians);
  return { x, y };
}
const generateInitial = () => ({
  x: Math.random() * 800,
  y: Math.random() * 800,
  scale: 0.1,
  rotate: Math.random() * 360,
  opacity: 0,
});
const generateFinal = (x: number, y: number) => ({
  x: x,
  y: y,
  rotate: 1,
  scale: 1,
  transition: {
    type: "spring",
    damping: 10,
    stiffness: 20,
    mass: 2,
  },
  opacity: 0.4,
});
</script>

<template>
  <div class="relative h-40 w-full">
    <div
      ref="name"
      v-motion
      class="-z-1 absolute opacity-0"
      :initial="nameInitial"
      :enter="nameFinal"
    >
      <TextGradient title="Anderson Vaz" class="text-6xl" />
    </div>
    <Icon
      v-for="state in iconStates"
      :key="state.icon"
      v-motion
      :initial="state.initial"
      :enter="state.final"
      :name="state.icon"
      class="absolute h-20 w-20 opacity-0"
    />
  </div>
</template>

<style scoped lang="postcss"></style>
