<template>
  <RouterLink :to="to" custom v-slot="{ navigate }">
    <article
      class="knowledgeCard"
      role="link"
      :aria-label="ariaLabel"
      tabindex="0"
      @click="navigate"
      @keydown.enter.prevent="navigate"
      @keydown.space.prevent="navigate"
    >
      <div
        class="cardPicture"
        :style="{ backgroundImage: `url(${imageUrl})` }"
      ></div>
      <div class="cardText">
        <p class="cardTitle">{{ word }}</p>
        <div class="hashtag">
          <RouterLink
            v-for="(tag, index) in tags"
            :key="index"
            class="tag"
            :to="tag.to"
            @click.stop
          >
            #{{ tag.label }}
          </RouterLink>
        </div>
      </div>
    </article>
  </RouterLink>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  to: { type: [String, Object], required: true },
  imageUrl: { type: String, required: true },
  word: { type: String, required: true },
  tags: { type: Array, default: () => [] }
})
const ariaLabel = computed(() => `開啟文章：${props.word}`)
</script>
<style scoped>
.knowledgeCard{
  display: flex;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.knowledgeCard:hover{
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
}
.cardPicture{
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center;
}
.cardText{
  width: 100%;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5em;
}

.cardText .cardTitle{
  margin: 0;
  font-size: 1rem;
  color: var(--black, #333);
  line-height: 1.5;
  text-align: justify;
}

.hashtag{
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}

.tag{
  color: var(--addColor,);
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 0.9rem;
}
@media (hover: hover){
  .tag:hover {
    color: var(--addColor);
  }
}
/* === 桌機版覆寫 === */
@media (min-width: 768px) {
  .knowledgeCard{
    flex-direction: row;
    align-items: center;
    height: 232px;
  }
  .cardPicture{
    width: 30%;
    height: 100%;
    flex-shrink: 0;
  }
  .cardText{
    width: 70%;
  }
}
</style>
