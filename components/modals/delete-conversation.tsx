"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

const DeleteConversation = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type === "deleteConversation";
  const [loading, setLoading] = useState(false);
  const { conversationId, label } = data;
  const router = useRouter();

  const onDelete = useCallback(() => {
    setLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/chat");
        router.refresh();
      })
      .catch(() => {
        toast({
          title: "An error occurred",
          description: "Something went wrong",
        });
      })
      .finally(() => setLoading(false));
  }, [router, conversationId, onClose]);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Conversation</DialogTitle>
          <DialogDescription>
            This will delete your conversations with{" "}
            <span className="font-bold">{label}</span>. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={onDelete} variant={"destructive"}>
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConversation;
