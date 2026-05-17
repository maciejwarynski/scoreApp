type HomePageItemProps = {
  title: string;
  image: string;
  onClick?: () => void;
};

function HomePageItem({ title, image, onClick }: HomePageItemProps) {
  return (
    <div
      className="h-1/2 w-2/5 flex flex-col justify-center items-center gap-2 cursor-pointer hover:scale-105 transition"
      onClick={onClick}
    >
      <img src={image} alt="kata" />
      <h1 className="bg-sky-600 p-2 w-1/2 rounded-lg text-center font-bold">
        {title}
      </h1>
    </div>
  );
}

export default HomePageItem;
