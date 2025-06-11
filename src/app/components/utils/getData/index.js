export async function getData() {
  try {
    const response = await fetch(
      `https://shop.jaimehayde.com/wp-json/wp/v2/portfolio?_embed`,
      {
        next: {
          revalidate: 60,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
