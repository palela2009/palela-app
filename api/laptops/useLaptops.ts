import { useQuery } from '@tanstack/react-query';
import { laptopService } from '../../services/api';
import { Product } from '../../contexts/ProductContext';

export const useLaptops = () => {
  return useQuery<Product[], Error>({
    queryKey: ['laptops'],
    queryFn: laptopService.getAll,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};

export const useLaptop = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ['laptop', id],
    queryFn: () => laptopService.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
