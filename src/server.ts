
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seed";

const bootstrap = async () => {
    try {
        await seedSuperAdmin();
        app.listen(envVars.PORT || 8000, () => {
            console.log(`Server is running on port ${envVars.PORT || 8000}`);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

bootstrap();