const CommentCard = () => {
  return (
    <div className="space-y-2 border-b border-b-white/20 pb-5">
      <div className="flex items-center gap-2">
        <picture>
          <img
            src="/ai3.jpg"
            alt="selbak"
            className="size-11 rounded-full object-cover"
          />
        </picture>

        <p className="font-semibold">ai store</p>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Necessitatibus, hic impedit dolores illum tenetur rerum vel expedita
          cum. Ipsam vero at nobis iste repellendus molestias officia deleniti
          est provident voluptates ipsum, modi nam deserunt suscipit! Doloribus
          iure placeat adipisci omnis nam ad, deleniti, ipsum laborum
          necessitatibus similique dolor consequatur. Nobis similique dolorum
          voluptatem reprehenderit corrupti quam impedit repudiandae totam
          magnam corporis eaque amet mollitia quod beatae sapiente, qui
          aspernatur iusto necessitatibus consequuntur, libero quidem dicta.
          Dicta, sit libero. Corrupti iure suscipit perferendis non quae velit
          tempore, et fuga repellat quaerat, vel, neque iste consectetur illo
          consequuntur sit culpa quos quisquam.
        </p>
      </div>

      <button type="button" className="text-blue-500">
        Reply
      </button>
    </div>
  );
};

export default CommentCard;
