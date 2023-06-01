export default function ListingCategories({ categories = [] }: any) {
  return (
    <div className="flex flex-row rounded-full shadow-md shadow-[rgba(0,0,0,.1)] py-2 border items-center px-4 gap-4">
      {categories.map((category: any) => (
        <div
          key={category.id}
          className="bg-[blue] w-[40px] h-[40px] rounded-full flex justify-center items-center"
        >
          {category.title}
        </div>
      ))}
    </div>
  );
}
