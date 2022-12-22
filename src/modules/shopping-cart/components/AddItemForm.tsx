import React, { useState } from "react";
import { Box, Button, FormControl, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

import { ALL_PRODUCTS } from "../modules/index";
import { actions as actionBasket} from "../../../store/basketSlice";
import { useAppDispatch } from "../../../store/hooks";

const AddItemBox = styled(Box)(() => ({
  display: "flex",
  flex: 1,
  marginTop: "25px"
}));

const ItemSelectWrapper = styled(FormControl)(() => ({
  width: "200px",
  marginRight: "20px"
}));

const QuantityInputWrapper = styled(FormControl)(() => ({
  width: "80px",
  marginRight: "20px"
}));

const AddItemForm: React.FC = () => {

  const [productId, setProductId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);      
  const dispatch = useAppDispatch();

  const handlerChangeProductId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProductId(event.target.value);
  }

  const handlerChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value >= 0) {
      setQuantity(+event.target.value);
    }
  }

  const handlerOnAddItem = () => {
    setProductId('');
    setQuantity(0);
    dispatch(actionBasket.addItem({ productId, quantity }))
  } 

  return (
    <AddItemBox>
      <ItemSelectWrapper>
        <TextField
          select
          label="Product"
          value={productId}
          onChange={handlerChangeProductId}
        >
          {ALL_PRODUCTS.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.label}
            </MenuItem>
          ))}
        </TextField>
      </ItemSelectWrapper>
      <QuantityInputWrapper>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={handlerChangeQuantity}
        />
      </QuantityInputWrapper>
      <Button
        variant="contained"
        onClick={handlerOnAddItem}
        disabled={!productId || !quantity}
      >
        Add
      </Button>
    </AddItemBox>
  );
};

export default AddItemForm;
