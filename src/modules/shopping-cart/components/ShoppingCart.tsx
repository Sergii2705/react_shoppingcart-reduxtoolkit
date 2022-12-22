import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../../store/hooks";
import AddItemForm from './AddItemForm';
import ItemsList from "./ItemsList";
import Total from "./Total";

const ShoppingCardWrapper = styled(Paper)(() => ({
  width: 600,
  margin: "auto",
  padding: 50,
  minHeight: 500
}));

const ShoppingCartHeader = styled(Typography)(() => ({
  textTransform: "uppercase",
  fontWeight: "bold",
  fontSize: 24
}));

const ShoppingCart = () => {
  const items = useAppSelector(state => state.basket)

  return (
    <ShoppingCardWrapper>
      <ShoppingCartHeader>Shopping Cart</ShoppingCartHeader>
      <AddItemForm/>
      {!!items.length &&
        <>
          <ItemsList />
          <Total />
        </>        
      }
    </ShoppingCardWrapper>
  );
};

export default ShoppingCart;
