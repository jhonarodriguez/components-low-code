import React from 'react'
import { Modal, ModalProps } from './Modal'
import { ValidationError } from '../../../core/types'
import { Button } from '../ui/button'

interface ModalErrorProps extends ModalProps {
    errors: ValidationError[]
}

export const ModalErrorSchema: React.FC<ModalErrorProps> = ({
    open,
    title,
    size = "auto",
    onClose,
    errors
}) => {

    const childrenErrors = (
        <>
            <p className="text-[#8A9099] text-sm my-3">
                No se ha podido completar la operación por las siguientes restricciones:
            </p>
            <ul>
                {errors.map(
                    ({ message }, index) => (
                        <li className="text-[#8A9099] text-sm my-1 bg-red-50 p-2 rounded" role="alert" key={index}>
                            {message}
                        </li>
                    )
                )}
            </ul>
            <div className="mx-auto pt-3 flex justify-center">
                <Button
                    onClick={onClose}
                    text='Cerrar'
                />
            </div>
        </>
    );

    return (
        <Modal
            open={open}
            title={`${title ?? 'La solicitud no se puede completar'}`}
            size={size}
            onClose={onClose}
        >
            {childrenErrors}
        </Modal>
    )
}
