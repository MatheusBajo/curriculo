// components/ToggleSensitive.tsx
import {Eye, EyeSlash, Lock} from '@phosphor-icons/react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {useState} from 'react';
import {useSensitive} from '@/contexts/SensitiveContext';

export default function ToggleSensitive() {
    const { visivel, toggle } = useSensitive();        // agora usa toggle
    const [open, setOpen] = useState(false);
    const [pw, setPw] = useState('');

    const tentar = () => {
        if (pw === '2982') {
            toggle();        // liga ou desliga
            setOpen(false);
            setPw('');
        } else alert('Senha incorreta');
    };

    return (
        <>
            <Button size="icon" variant="outline" className="!bg-foreground !text-background hover:!bg-[#1a2e35]" onClick={() => (visivel ? toggle() : setOpen(true))}>
                {visivel ? <EyeSlash size={20}/> : <Eye size={20}/>}
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent aria-describedby={undefined} className="sm:max-w-[320px] bg-background">
                    <DialogHeader>
                        <DialogTitle><Lock size={20} className="inline mr-1"/> Digite a senha</DialogTitle>
                    </DialogHeader>
                    <Input
                        type="password"
                        placeholder="2982"
                        value={pw}
                        onChange={e => setPw(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && tentar()}
                    />
                    <Button className="mt-2 w-full" onClick={tentar}>Liberar</Button>
                </DialogContent>
            </Dialog>
        </>
    );
}
