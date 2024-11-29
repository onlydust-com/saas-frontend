import { CardTransactionPort } from "@/design-system/molecules/cards/card-transaction";

interface Transaction extends Pick<CardTransactionPort<"div">, "type" | "date" | "amount"> {
  id: string;
}

export interface TransactionsWrapperProps {
  isLoading: boolean;
  transactions: Transaction[];
}
