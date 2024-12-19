import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
export interface Spec extends TurboModule {
    uploadFile(signedURL: string, filePath: string, contentType: string): Promise<string>
}

export default TurboModuleRegistry.getEnforcing<Spec>(
    'NativeS3Uploader',
) as Spec;
