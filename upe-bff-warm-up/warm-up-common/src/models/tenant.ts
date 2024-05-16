import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Migration } from './migration';

export interface TenantDoc extends mongoose.Document {
  name: string;
  crudUri: string;
  executeInitialConfig: boolean;
  migrations: Migration[];
  version: number;
}

const TenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      description: 'Nome do Tenant',
    },
    crudUri: {
      type: String,
      required: true,
      description: 'URI do Banco de Dados do crud do Tenant',
    },
    executeInitialConfig: {
      type: Boolean,
      required: true,
      description:
        'Flag que indica se ao inicializar a aplicação deve ser executado o script de popular a configuração inicial',
    },
    migrations: [
      {
        fileName: {
          type: String,
          required: true,
          description: 'Nome do arquivo de migração',
        },
        dateExecuted: {
          type: Date,
          required: true,
          description: 'Data de execução da migração',
        },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

TenantSchema.set('versionKey', 'version');
TenantSchema.plugin(updateIfCurrentPlugin);

export { TenantSchema };
