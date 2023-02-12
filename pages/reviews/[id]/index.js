import React from 'react'
import { useRouter } from "next/router";

import { BackButton } from '../../../components/Buttons';
import SharedLayout from '../../../components/layout/SharedLayout';

const Review = () => {
  const router = useRouter();
  const routeId = router.query.id;
  const splitPath = router.asPath.split("/");
  const currentPath = splitPath[1]
  
  return (
    <SharedLayout>
      <BackButton currentPath={currentPath} />
      <div>Review</div>
    </SharedLayout>
  )
}

export default Review;