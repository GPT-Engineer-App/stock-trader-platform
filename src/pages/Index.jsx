import React, { useState } from "react";
import { Box, Button, Container, Heading, Input, Stack, Table, Tbody, Td, Th, Thead, Tr, useToast, VStack } from "@chakra-ui/react";
import { FaPlus, FaShoppingCart, FaDollarSign } from "react-icons/fa";

const Index = () => {
  const [stocks, setStocks] = useState([]);
  const [newStockName, setNewStockName] = useState("");
  const [newStockPrice, setNewStockPrice] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const toast = useToast();

  const addStock = () => {
    if (newStockName.trim() === "" || isNaN(newStockPrice) || newStockPrice <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid stock name and price.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newStock = {
      name: newStockName,
      price: parseFloat(newStockPrice),
      quantity: 0,
    };
    setStocks([...stocks, newStock]);
    setNewStockName("");
    setNewStockPrice("");
  };

  const buyStock = (stockName) => {
    const updatedStocks = stocks.map((stock) => {
      if (stock.name === stockName) {
        return { ...stock, quantity: stock.quantity + 1 };
      }
      return stock;
    });
    setStocks(updatedStocks);
  };

  const sellStock = (stockName) => {
    const updatedStocks = stocks.map((stock) => {
      if (stock.name === stockName && stock.quantity > 0) {
        return { ...stock, quantity: stock.quantity - 1 };
      }
      return stock;
    });
    setStocks(updatedStocks);
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading>{isAdmin ? "Admin Dashboard" : "Stock Trading System"}</Heading>
        <Button onClick={toggleAdmin}>{isAdmin ? "Switch to User" : "Switch to Admin"}</Button>
        {isAdmin && (
          <Box as="form" onSubmit={(e) => e.preventDefault()}>
            <Stack direction={["column", "row"]} spacing={4} align="center">
              <Input placeholder="Stock Name" value={newStockName} onChange={(e) => setNewStockName(e.target.value)} />
              <Input placeholder="Initial Price" type="number" value={newStockPrice} onChange={(e) => setNewStockPrice(e.target.value)} />
              <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addStock}>
                Create Stock
              </Button>
            </Stack>
          </Box>
        )}
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Stock Name</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Quantity</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stocks.map((stock) => (
              <Tr key={stock.name}>
                <Td>{stock.name}</Td>
                <Td isNumeric>${stock.price.toFixed(2)}</Td>
                <Td isNumeric>{stock.quantity}</Td>
                <Td>
                  {!isAdmin && (
                    <Stack direction="row" spacing={4}>
                      <Button leftIcon={<FaShoppingCart />} size="sm" onClick={() => buyStock(stock.name)}>
                        Buy
                      </Button>
                      <Button leftIcon={<FaDollarSign />} size="sm" colorScheme="pink" onClick={() => sellStock(stock.name)}>
                        Sell
                      </Button>
                    </Stack>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default Index;
