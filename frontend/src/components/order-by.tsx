import { useEffect, useState } from "react";

interface OrderByProps {
  handleOrder: (order: string) => void;
}

const OrderBy = ({ handleOrder }: OrderByProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    handleOrder(selectedOption);
  }, [selectedOption]);

  return (
    <div className="order-container">
      <label>Ordenar por data de emissão: </label>
      <select
        className="order-select"
        name="order"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="">Escolha uma opção</option>
        <option value="newest">Mais novas</option>
        <option value="oldest">Mais antigas</option>
      </select>
    </div>
  );
};

export default OrderBy;
