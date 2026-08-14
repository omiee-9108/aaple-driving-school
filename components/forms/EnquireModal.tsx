"use client";

import React, { createContext, useContext, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { LeadForm } from "./LeadForm";

interface EnquireModalContextType {
  openEnquireModal: (serviceSlug?: string) => void;
  closeEnquireModal: () => void;
}

const EnquireModalContext = createContext<EnquireModalContextType>({
  openEnquireModal: () => {},
  closeEnquireModal: () => {},
});

export const useEnquireModal = () => useContext(EnquireModalContext);

export const EnquireModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | undefined>();

  const openEnquireModal = (serviceSlug?: string) => {
    setSelectedServiceSlug(serviceSlug);
    setIsOpen(true);
  };

  const closeEnquireModal = () => {
    setIsOpen(false);
    setSelectedServiceSlug(undefined);
  };

  return (
    <EnquireModalContext.Provider value={{ openEnquireModal, closeEnquireModal }}>
      {children}
      <Modal
        isOpen={isOpen}
        onClose={closeEnquireModal}
        title="Enquire Now / मोफत सल्ला"
        subtitle="Get instant batch timings, fees, and RTO test details from Miraj office"
        maxWidth="lg"
      >
        <LeadForm
          defaultServiceSlug={selectedServiceSlug}
          sourceContext="Header/Global Enquire Modal"
          onSuccess={() => {}}
        />
      </Modal>
    </EnquireModalContext.Provider>
  );
};
