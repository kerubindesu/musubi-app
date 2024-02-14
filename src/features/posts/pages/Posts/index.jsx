import React from 'react'
import { PostsList } from '../../components/organism'
import { HeadingTitle } from '../../../../components/atoms'

const Posts = () => {
  return (
    <div>
      <HeadingTitle variant={"text-2xl"} text={"Post"} />
      <PostsList />
    </div>
  )
}

export default Posts