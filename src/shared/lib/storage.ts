export const BOARD_STORAGE_KEY = "admin-dashboard-board-v1"

export const saveBoard = (data: unknown) => {
    localStorage.setItem(
        BOARD_STORAGE_KEY,
        JSON.stringify(data)
    )
}

export const loadBoard = () => {
    const saved = localStorage.getItem(BOARD_STORAGE_KEY)
    if(!saved) return null
    return JSON.parse(saved)
}