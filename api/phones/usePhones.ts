import { useQuery } from '@tanstack/react-query';
import { phoneService } from '../../services/api';
import { Product } from '../../contexts/ProductContext';

export const usePhones = () => {
  return useQuery<Product[], Error>({
    queryKey: ['phones'],
    queryFn: phoneService.getAll,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const usePhone = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ['phone', id],
    queryFn: () => phoneService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
