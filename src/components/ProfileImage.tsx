import React from 'react'
import { toSvg } from 'jdenticon'
import { VFC } from 'react'

type Props = {
  className: string
  userId: string
  size: number
}

const ProfileImage: VFC<Props> = ({ className, userId, size }) => {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{
        __html: toSvg(userId, size),
      }}
    />
  )
}

export default ProfileImage
