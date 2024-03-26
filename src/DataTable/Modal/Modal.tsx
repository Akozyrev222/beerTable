import Paragraph from "antd/es/typography/Paragraph";
import React from "react";
import {Beer} from "../../types/data";
import {Modal, Image, Flex} from "antd";
import {useModal} from "./useModal";

type ModalProps = {
    currentModal: Beer | null | undefined
    isModalOpen: boolean
    handleCancel: () => void

}
export const CustomModal = (props: ModalProps) => {
    const {currentModal, isModalOpen, handleCancel} = props
    const {photo} = useModal(currentModal)
    return (
        <Modal
            title={currentModal?.title}
            open={isModalOpen}
            okButtonProps={{style: {display: 'none'}}}
            onCancel={handleCancel}
        >
            {photo &&
                <Flex justify={'center'}>
                    <Image
                        style={{margin: '0 auto'}}
                        width={200}
                        src={photo}
                    />
                </Flex>
                }
            <Paragraph
                style={{textAlign: 'center', paddingTop: '12px'}}
            >
                <b>Country</b>: {currentModal?.country}
            </Paragraph>
            <Paragraph
                style={{textAlign: 'center'}}
            >
                <b>Percent</b>: {currentModal?.alchool}
            </Paragraph>
            <Paragraph
                style={{textAlign: 'center'}}
            >
                <b>Description</b>:
                <br/>{currentModal?.description}
            </Paragraph>
        </Modal>
    )
}