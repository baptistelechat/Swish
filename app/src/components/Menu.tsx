import { Button } from "@ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@ui/card";


const Menu = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
        <Button>Click Me !</Button>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default Menu;
