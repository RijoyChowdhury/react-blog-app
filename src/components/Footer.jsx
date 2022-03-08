import { useStoreState } from "easy-peasy";

const Footer = () => {
  const postCount = useStoreState((state) => state.postCount);
  return (
    <footer className='Footer'>
      <p>{postCount} Blog Post{postCount > 1 && 's'}</p>
    </footer>
  )
}

export default Footer