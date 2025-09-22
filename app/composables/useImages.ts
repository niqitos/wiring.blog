export const useImages = () => {
  const placeholders = ref({
    image: '/images/cover.jpg'
  })

  return {
    placeholders
  }
}
