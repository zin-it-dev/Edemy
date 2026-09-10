import { UserButton } from "@clerk/nextjs";

const DotIcon = () => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            fill='currentColor'
        >
            <path d='M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z' />
        </svg>
    );
};

const CustomUserButton = () => {
    // const { has, isLoaded } = useAuth();

    // if (!isLoaded) {
    //     return <span>Loading...</span>;
    // }

    return (
        <UserButton>
            <UserButton.MenuItems>
                <UserButton.Link
                    label='Create organization'
                    labelIcon={<DotIcon />}
                    href='/billing'
                />
            </UserButton.MenuItems>
        </UserButton>
    );
};

export default CustomUserButton;
