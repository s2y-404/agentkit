import { Modal } from "~/components/Common"
import { useConversationStore, useMessageStore } from "~/stores"

interface Props {
  getConversationClearModalId: (id?: string) => string
}

const ClearConversationConfirmModal = ({ getConversationClearModalId }: Props) => {
  const conversationStore = useConversationStore()
  const messageStore = useMessageStore()

  const handleClearMessages = () => {
    messageStore.clearMessage((item) => item.conversationId !== conversationStore.currentConversationId)
    Modal.closeModal(modalId)
  }

  const modalId = getConversationClearModalId()

  return (
    <Modal.Component
      uniqueModalId={modalId}
      actionButtons={
        <div className="flex w-64 flex-row items-center justify-end gap-csm">
          <button
            className="daisybtn daisybtn-error daisybtn-sm font-normal capitalize text-neutral lg:daisybtn-md hover:opacity-80"
            onClick={handleClearMessages}
            aria-label="Name"
          >
            Clear
          </button>
          <button
            className="daisybtn glass daisybtn-sm font-normal capitalize lg:daisybtn-md hover:text-neutral"
            onClick={() => {
              Modal.closeModal(modalId)
            }}
            aria-label="Name"
          >
            Close
          </button>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center rounded-lg bg-transparent px-cmd py-cxl dark:bg-base-100">
        <p className="m-0 p-0 !text-fluid-cmd font-bold">Clear messages</p>
        <div className="daisydivider" />
        <p className="text-gray-500">Are you sure to clear the messages in current conversation?</p>
      </div>
    </Modal.Component>
  )
}

export default ClearConversationConfirmModal
