export function Shuffle(elements: any[]) {
  for (let currentIndex = elements.length - 1; currentIndex > 0; currentIndex--) {
    let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    let swappedElement = elements[currentIndex];
    elements[currentIndex] = elements[randomIndex];
    elements[randomIndex] = swappedElement;
  }
}