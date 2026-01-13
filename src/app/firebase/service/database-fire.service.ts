import { Injectable, inject } from '@angular/core';
import {
  Storage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  listAll
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DatabaseFireService {

  private storage: Storage = inject(Storage);

  constructor() { }

  async uploadUserPhoto(file: File, userId: string): Promise<string> {
    try {
      const path = `users/${userId}/profile_picture`;
      const fileRef = storageRef(this.storage, path);

      const result = await uploadBytes(fileRef, file);
      return await getDownloadURL(result.ref);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  }

  async uploadPublicImage(file: File, fileName: string): Promise<string> {
    try {
      // O caminho agora aponta para a pasta /public
      //const path = `public/${Date.now()}_${fileName}`;
      const path = `public/${fileName}`;
      const fileRef = storageRef(this.storage, path);

      const result = await uploadBytes(fileRef, file);
      return await getDownloadURL(result.ref);
    } catch (error) {
      console.error('Erro no upload público:', error);
      throw error;
    }
  }

  async getPublicImageURL(fileName: string): Promise<string> {
    try {
      const path = `public/${fileName}`;
      const fileRef = storageRef(this.storage, path);
      return await getDownloadURL(fileRef);
    } catch (error) {
      console.error('Imagem não encontrada:', error);
      throw error;
    }
  }

  async listAllPublicImages() {
    try {
      const folderRef = storageRef(this.storage, 'public');
      const res = await listAll(folderRef);

      // Retorna uma lista de objetos com nome e caminho
      return res.items.map(item => ({
        name: item.name,
        fullPath: item.fullPath
      }));
    } catch (error) {
      console.error('Erro ao listar arquivos:', error);
      throw error;
    }
  }
}
