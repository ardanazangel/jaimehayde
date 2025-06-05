export async function getData() {
  try {
    const response = await fetch(
      `https://jaimehayde.com/wp-json/wp/v2/portfolio?_embed`
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
