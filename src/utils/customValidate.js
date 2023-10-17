/* -------- CUSTOM VALIDATE --------*/
// Validate khoảng trắng xuất hiện ở đầu và cuối
export const validateTrimmedFirstAndLast = (_, value) => {
    if (value && value.trim() !== value) {
        return Promise.reject("Không được chứa khoảng trắng!");
    }
    return Promise.resolve();
};

// Validate Input không được chứa khoảng trắng
export const validateTrimExists = (_, value) => {
    if (!value.includes(" ")) {
        return Promise.resolve()
    }
    return Promise.reject(new Error("Không được tồn tại khoảng trắng!"));
}
