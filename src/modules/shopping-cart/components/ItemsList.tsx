import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { actions as actionBasket} from "../../../store/basketSlice";
import { PRODUCTS_MAP } from "../modules/index";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

const ItemsListWrapper = styled(Box)(() => ({
  paddingTop: 20
}));



const ItemsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.basket)

  return (
    <ItemsListWrapper>
      {items.map((item) => {
        const product = PRODUCTS_MAP[item.productId];
        const price = product?.price || 0;

        return (
          <Grid container key={item.productId}>
            <Grid item xs={12}>
              <Typography>{product?.label}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{`${item.quantity} x $${price} = $${
                item.quantity * price
              }`}</Typography>
            </Grid>
            <ButtonGroup variant="outlined" aria-label="outlined button group">
              <Button
                onClick={() => dispatch(actionBasket.increaseItem(item.productId))}
              >+</Button>
              <Button
                onClick={() => dispatch(actionBasket.decreaseItem(item.productId))}
              >-</Button>
              <Button
                onClick={() => dispatch(actionBasket.deleteItem(item.productId))}
              >x</Button>
            </ButtonGroup>
          </Grid>
        );
      })}
    </ItemsListWrapper>
  );
};

export default ItemsList;
