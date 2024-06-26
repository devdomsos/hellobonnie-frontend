import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: string | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
          py-4
          border-b-[1px]
        "
      >
      <Container>
        <div
          className="
          relative
            flex
            flex-row
            items-center
            justify-center
            gap-3
            md:gap-0
          "
        >
            <Logo />
          <Search />
        </div>
      </Container>
    </div>
  </div>
  );
}


export default Navbar;
