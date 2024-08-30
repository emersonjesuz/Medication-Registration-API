import { z } from 'zod';

export const createMedicationSchema = z.object({
  name: z.string({ message: 'Required name' }),
  label: z.string({ message: 'Required label' }),
  code: z.string({ message: 'Required code' }),
  isGeneric: z.boolean({ message: 'Required Generic' }),
  isReciep: z.boolean({ message: 'Required Reciep' }),
  price: z.number({ message: 'Required price' }),
});
