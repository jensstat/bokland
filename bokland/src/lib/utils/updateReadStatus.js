export async function toggleReadStatus(bookId, hasRead) {
    try {
        const response = await fetch(`/api/updateReadStatus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookId, hasRead })
        });
        
        if (!response.ok) throw new Error("Failed to update read status.");
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error updating read status:", error);
    }
}
