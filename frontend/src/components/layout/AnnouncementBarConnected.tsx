import { dismissAnnouncement } from '../../store/slices/uiSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import AnnouncementBar from './AnnouncementBar'

export default function AnnouncementBarConnected(props) {
  const visible = useAppSelector((state) => state.ui.announcementVisible)
  const dispatch = useAppDispatch()

  if (!visible) return null

  return (
    <AnnouncementBar
      {...props}
      onClose={() => dispatch(dismissAnnouncement())}
    />
  )
}
