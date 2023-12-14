import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthServiceService } from '../services/auth-service.service';

@Pipe({
  name: 'getLogo'
})
export class GetLogoPipe implements PipeTransform {
  constructor(private authServiceService: AuthServiceService, private sanitizer: DomSanitizer) { }
  async transform(fileId: string) {
    const logoFile: any = await this.authServiceService.getLogoImageById({fileId});
    if (!logoFile.success) return
    if (logoFile.data.mimetype == "svg+xml") {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/svg+xml;base64,${logoFile.data.data}`);
    }
    return `data:image/jpg;base64,${logoFile.data.data}`;
  }

}

