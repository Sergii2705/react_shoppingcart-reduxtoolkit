import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import { actions as actionBasket} from "../../../store/basketSlice";
import { PRODUCTS_MAP } from "../modules/index";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

const TotalWrapper = styled(Box)(() => ({
  paddingTop: 40
}));

const Total:React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(state => state.basket);

  const total = useMemo(() => items.reduce((acc, item) => acc + item.quantity * PRODUCTS_MAP[item.productId].price, 0)
  , [items]);

  return (
    <TotalWrapper>
      <Grid container>
        <Grid item xs={6}>
          <Typography>{`Total: $${total}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Button 
            variant="outlined"
            onClick={() => dispatch(actionBasket.clearAll())}
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </TotalWrapper>
  );
};

export default Total;