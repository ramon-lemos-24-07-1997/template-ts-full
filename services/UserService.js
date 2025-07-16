

const test = async (data) => {
    try {
        return { success: true, message: "User test com sucesso", data };
    } catch (err) {
        throw err;
    }
};


export { 
    test,
};