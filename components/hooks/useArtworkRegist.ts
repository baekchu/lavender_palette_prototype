import { create } from 'zustand';

interface ArtworkRegistStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useArtworkRegist = create<ArtworkRegistStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useArtworkRegist;