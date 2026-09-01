import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ReactNode, useState } from 'react'
import { Eye, FileText, ImageIcon, Link2, X } from 'lucide-react'
import Loader from '@/components/ui/Loader/Loader'
import { TutorVerification } from '../../store/types'
import useDownloadAttachment from '../../hooks/useDownloadAttachment'

type Props = {
  id?: string
  showingComponent: ReactNode
  tutorVerificationData?: {
    data?: TutorVerification
    isLoading?: boolean
  }
}

type DocItem =
  | { kind: 'url'; key: string; label: string; href: string }
  | { kind: 'file'; key: string; label: string; href: string; mimeType: string }

function getFileIcon(mimeType: string) {
  if (mimeType.startsWith('image/')) return ImageIcon
  return FileText
}

function flattenDocuments(data?: TutorVerification): DocItem[] {
  if (!data) return []
  const items: DocItem[] = []

  data.certifications.forEach((cert) => {
    if (cert.credentialUrl) {
      items.push({
        kind: 'url',
        key: `${cert.id}-url`,
        label: cert.credentialUrl,
        href: cert.credentialUrl,
      })
    }
    cert.files.forEach((file) => {
      items.push({
        kind: 'file',
        key: file.id,
        label: file.fileName,
        href: `/admin/tutor-verifications/${data.id}/certifications/${cert.id}/files/${file.id}/url`,
        mimeType: file.mimeType,
      })
    })
  })

  return items
}

const docRowClass =
  'flex items-center justify-between gap-2 rounded-lg border border-[#2563EB] bg-[#F9FAFB] px-3 py-1.5 text-sm text-[#2563EB] no-underline'

const ViewTutorVerificationInfo = ({ showingComponent, tutorVerificationData }: Props) => {
  const [open, setOpen] = useState(false)
  const { handleDownload } = useDownloadAttachment()
  const data = tutorVerificationData?.data
  const documents = flattenDocuments(data)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{showingComponent}</DialogTrigger>
      <DialogContent
        className="max-h-[50rem] w-[400px] overflow-y-auto sm:w-[425px] sm:min-w-[500px]"
        style={{
          boxShadow: '0px 0px 10px 0px rgba(255, 255, 255, 0.80)',
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-text text-2xl font-[600]">
            <div className="flex w-full items-center justify-between">
              <span>{`${tutorVerificationData?.data?.user.firstname} ${tutorVerificationData?.data?.user.lastname}`}</span>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close dialog">
                <X className="text-label size-4" />
              </button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {tutorVerificationData?.isLoading && (
            <Loader className="flex h-20 w-full items-center justify-center" />
          )}
          {data && (
            <div>
              {documents.length === 0 ? (
                <div className="rounded-md border border-dashed border-border px-4 py-6 text-center text-sm text-muted">
                  No documents submitted.
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {documents.map((doc) => {
                    const Icon = doc.kind === 'url' ? Link2 : getFileIcon(doc.mimeType)

                    if (doc.kind === 'url') {
                      return (
                        <a
                          key={doc.key}
                          href={doc.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={docRowClass}
                        >
                          <div className="flex items-center gap-4">
                            <Icon className="size-[19px] shrink-0 text-accent" aria-hidden="true" />
                            <span className="min-w-0 flex-1 truncate">{doc.label}</span>
                          </div>
                          <Eye className="size-4 shrink-0 text-muted" aria-hidden="true" />
                        </a>
                      )
                    }

                    return (
                      <button
                        key={doc.key}
                        type="button"
                        onClick={() => handleDownload(doc.href)}
                        className={docRowClass}
                      >
                        <div className="flex items-center gap-4">
                          <Icon className="size-[19px] shrink-0 text-accent" aria-hidden="true" />
                          <span className="min-w-0 flex-1 truncate">{doc.label}</span>
                        </div>
                        <Eye className="size-4 shrink-0 text-muted" aria-hidden="true" />
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default ViewTutorVerificationInfo
