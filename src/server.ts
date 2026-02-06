
import app from "./app";

const bootstrap = () => {
    try {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

bootstrap();