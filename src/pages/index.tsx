import type { NextPage } from "next";
import Link from "next/link";
import Chapter from "./components/Chapter";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-row gap-5 flex-wrap text-white">
      <ul>
        <Chapter chapter="Chapter 1" />
        <li>
          <Link href="#">
            <a>1 - ...</a>
          </Link>
        </li>
      </ul>
      <ul>
        <Chapter chapter="Chapter 2" />
        <li>
          <Link href="/15-lights">
            <a>15 - Lights</a>
          </Link>
        </li>
      </ul>
      <ul>
        <Chapter chapter="Chapter 3" />
        <li>
          <Link href="#">
            <a>22 - ...</a>
          </Link>
        </li>
      </ul>
      <ul>
        <Chapter chapter="Chapter 4" />
        <li>
          <Link href="#">
            <a>27 - ...</a>
          </Link>
        </li>
      </ul>
      <ul>
        <Chapter chapter="Chapter 5" />
        <li>
          <Link href="#">
            <a>32 - ...</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
