export const useImages = () => {
  const placeholders = ref({
    cover: '/images/cover.jpg'
  })

  return {
    placeholders
  }
}
