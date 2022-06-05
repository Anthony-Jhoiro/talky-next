import { Asset } from ".";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Dialog from "@radix-ui/react-dialog";
import { PostAsset } from "./PostAsset";

export interface AssetGridProps {
  assets: Asset[];
}

function useModalValueState<T>(initialValue: T | null = null) {
  const [selected, setIsOpen] = useState<T | null>(initialValue);
  const open = (v: T) => setIsOpen(v);
  const close = () => setIsOpen(null);

  return { selected, open, close, isOpen: selected !== null };
}

export const AssetGrid = ({ assets }: AssetGridProps) => {
  const { open, close, selected, isOpen } = useModalValueState<number>();

  return (
    <>
      <div className={"flex flex-wrap isolate"}>
        {assets.map((asset, index) => (
          // <Dialog.DialogTrigger asChild key={'asset_' + index}>
          <motion.div
            key={"asset_" + index}
            layoutId={`layout_${index}`}
            whileHover={{ scale: 1.1, z: -50 }}
            className={"h-32 basis-1/3 flex-1 relative cursor-pointer"}
            onClick={() => open(index)}
          >
            <div className={"absolute -z-10 top-0 left-0 h-full w-full"}>
              <PostAsset asset={asset} />
            </div>
          </motion.div>
        ))}
      </div>

      <Dialog.Root onOpenChange={close} open={isOpen}>
        <AnimatePresence>
          {isOpen && (
            <Dialog.Portal>
              <Dialog.Overlay asChild>
                <motion.div
                  className="fixed inset-0 cursor-pointer bg-black/50 backdrop-blur-[10px]"
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0 }}
                  onClick={close}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </Dialog.Overlay>
              <Dialog.Content
                className={
                  "top-1/2 left-1/2 origin-center fixed -translate-x-1/2 -translate-y-1/2"
                }
              >
                <motion.div
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  layoutId={`layout_${selected}`}
                  className={"h-64 w-64"}
                  initial="hidden"
                  animate="show"
                >
                  {isOpen && selected && <PostAsset asset={assets[selected]} />}
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
};
