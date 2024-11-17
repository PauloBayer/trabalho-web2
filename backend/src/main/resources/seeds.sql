INSERT INTO public.tb_categoria (ativo, data_atualizacao, data_criacao, nome)
VALUES 
(1, true, '2024-11-16 10:30:00', '2024-01-15 08:45:00', 'Eletrônicos'),
(2, true, '2024-11-16 11:00:00', '2024-03-10 14:20:00', 'Móveis'),
(3, false, '2024-11-16 09:50:00', '2023-12-05 09:30:00', 'Eletrodomésticos'),
(4, true, '2024-11-16 12:15:00', '2024-06-01 11:10:00', 'Ferramentas'),
(5, true, '2024-11-16 13:45:00', '2024-08-22 16:05:00', 'Computadores');


INSERT INTO public.tb_clientes (id, cep, cpf, created_at, email, nome, senha, telefone, updated_at) 
VALUES 
(1, '12345-678', '123.456.789-01', '2024-01-10 08:30:00', 'joao.silva@email.com', 'João Silva', 'senha123', '(11) 98765-4321', '2024-11-10 10:00:00'),
(2, '87654-321', '987.654.321-00', '2024-02-15 09:45:00', 'maria.santos@email.com', 'Maria Santos', 'senha456', '(21) 91234-5678', '2024-11-15 11:20:00'),
(3, '11223-445', '321.654.987-12', '2024-03-20 12:00:00', 'carlos.pereira@email.com', 'Carlos Pereira', 'senha789', '(31) 99876-5432', '2024-11-16 13:30:00'),
(4, '55678-990', '456.789.123-45', '2024-04-25 14:15:00', 'ana.mendes@email.com', 'Ana Mendes', 'senha1234', '(41) 93456-7890', '2024-11-16 15:45:00'),
(5, '33445-667', '789.123.456-78', '2024-05-30 16:30:00', 'lucas.rocha@email.com', 'Lucas Rocha', 'senha5678', '(51) 98765-1234', '2024-11-16 17:00:00');


INSERT INTO public.tb_funcionarios (id, data_nascimento, email, nome, senha) 
VALUES 
(1, '1990-05-10', 'marcos.lima@email.com', 'Marcos Lima', 'senhaadmin1'),
(2, '1985-08-22', 'fernanda.silva@email.com', 'Fernanda Silva', 'senhaadmin2'),
(3, '1992-12-03', 'roberto.souza@email.com', 'Roberto Souza', 'senhaadmin3'),
(4, '1988-03-14', 'juliana.alves@email.com', 'Juliana Alves', 'senhaadmin4'),
(5, '1995-11-29', 'paulo.oliveira@email.com', 'Paulo Oliveira', 'senhaadmin5');


INSERT INTO public.solicitacao_manutencao (
    data_hora_criacao, 
    data_hora_atualizacao, 
    descricao_defeito, 
    descricao_equipamento, 
    descricao_manutencao, 
    motivo_rejeicao,
    orientacoes_extras_orcamento, 
    orientacoes_manutencao, 
    status, 
    valor_orcado, 
    id_categoria, 
    id_cliente, 
    id_funcionario
) VALUES
('2024-11-01 10:15:00', '2024-11-01 10:15:00', 'Tela quebrada', 'Laptop Dell XPS 13', NULL, NULL, NULL, NULL, 'ABERTA', NULL, 1, 1, NULL),
('2025-11-01 10:15:00', '2025-11-01 10:15:00', 'Tela quebrada', 'Samsung J5', NULL, NULL, 'Trocar tela trincada por uma original', NULL, 'ORCADA', 100.0, 1, 1, 1),






