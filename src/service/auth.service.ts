import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import { type SignIn } from "@types";

export const authService = {
  async signIn(model: SignIn, role: string): Promise<any> {
    const res = await apiConfig().postRequest(
      `/${role}-auth${ApiUrls.AUTH}`,
      model
    );
    return res;
  },
};
