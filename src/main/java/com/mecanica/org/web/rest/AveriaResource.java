package com.mecanica.org.web.rest;

import com.mecanica.org.domain.Averia;
import com.mecanica.org.domain.Entrada;
import com.mecanica.org.domain.Pago;
import com.mecanica.org.domain.PagosCalculos;
import com.mecanica.org.repository.AveriaRepository;
import com.mecanica.org.repository.EntradaRepository;
import com.mecanica.org.repository.PagoRepository;
import com.mecanica.org.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mecanica.org.domain.Averia}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AveriaResource {

    private final Logger log = LoggerFactory.getLogger(AveriaResource.class);

    private static final String ENTITY_NAME = "averia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AveriaRepository averiaRepository;

    private final EntradaRepository entradaRepository;

    private final PagoRepository pagoRepository;

    public AveriaResource(AveriaRepository averiaRepository, EntradaRepository entradaRepository, PagoRepository pagoRepository) {
        this.averiaRepository = averiaRepository;
        this.entradaRepository = entradaRepository;
        this.pagoRepository = pagoRepository;
    }

    /**
     * {@code POST  /averias} : Create a new averia.
     *
     * @param averia the averia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new averia, or with status {@code 400 (Bad Request)} if the averia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/averias")
    public ResponseEntity<Averia> createAveria(@RequestBody Averia averia) throws URISyntaxException {
        log.debug("REST request to save Averia : {}", averia);
        if (averia.getId() != null) {
            throw new BadRequestAlertException("A new averia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Averia result = averiaRepository.save(averia);
        return ResponseEntity.created(new URI("/api/averias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /averias} : Updates an existing averia.
     *
     * @param averia the averia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated averia,
     * or with status {@code 400 (Bad Request)} if the averia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the averia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/averias")
    public ResponseEntity<Averia> updateAveria(@RequestBody Averia averia) throws URISyntaxException {
        log.debug("REST request to update Averia : {}", averia);
        if (averia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Averia result = averiaRepository.save(averia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, averia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /averias} : get all the averias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of averias in body.
     */
    @GetMapping("/averias")
    public List<Averia> getAllAverias( @RequestParam(required = false) Long IdAutomovil ) {
        log.debug("REST request to get all Averias");
        log.info("retornando averias");
        if( IdAutomovil != null && IdAutomovil > 0 ){
            log.info("returning all averias of automovil with id: "+IdAutomovil.toString());
            return averiaRepository.findByAutomovilId(IdAutomovil);
        }
        return averiaRepository.findAll();
    }

    /**
     * {@code GET  /averias/:id} : get the "id" averia.
     *
     * @param id the id of the averia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the averia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/averias/{id}")
    public ResponseEntity<Averia> getAveria(@PathVariable Long id) {
        log.debug("REST request to get Averia : {}", id);
        Optional<Averia> averia = averiaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(averia);
    }

    @GetMapping("/averias/{id}/entradas")
    public PagosCalculos getAveriaPagosCalculos(@PathVariable Long id) {
        log.debug("REST request to get Averia : {}", id);
       try {
           List<Entrada>  entradas= entradaRepository.findByAveriaId(id);
           PagosCalculos pagos = new PagosCalculos();

           Double totalapagar = entradas.stream()
               .mapToDouble(en -> ( en.getPrecio() ) )
               .reduce( 0.0,( a, b) -> a+b );
           totalapagar = Math.floor( totalapagar * 100 ) /100;
           List<Pago> ListPagos = pagoRepository.findByAveriaId(id);

           Double pagado = ListPagos.stream()
               .mapToDouble( pa -> ( pa.getTotal() ) )
               .reduce(0.0, (a,b) -> a+b );
           pagado = Math.floor( pagado * 100) / 100;
           pagos.setFaltanteApagar( Math.ceil( (totalapagar - pagado) *100 ) /100 );
           pagos.setTotalApagar( totalapagar );
           return pagos;
       }catch (Exception e){
           return null;
       }
    }

    /**
     * {@code DELETE  /averias/:id} : delete the "id" averia.
     *
     * @param id the id of the averia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/averias/{id}")
    public ResponseEntity<Void> deleteAveria(@PathVariable Long id) {
        log.debug("REST request to delete Averia : {}", id);
        averiaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    @GetMapping("/averia/report")
    public void averiaReport(HttpServletResponse response, @RequestParam(required = false) Long averiaId ) throws FileNotFoundException, JRException, IOException,IllegalStateException {

        File file  = ResourceUtils.getFile("classpath:presupuesto.jrxml");

        JasperReport jasperReport  = JasperCompileManager.compileReport(file.getAbsolutePath());
        System.out.println("doing");
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(entradaRepository.findByAveriaId( averiaId ));
        HashMap<String,Object> parameters =new HashMap<String, Object>();

        parameters.put("createdBy", "Compañia");
        parameters.put("datasource1","");
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters,dataSource );

        final String filePath = "\\";
        JasperExportManager.exportReportToPdfFile(jasperPrint, filePath + "Presupuesto.pdf");

        response.setContentType("application/x-download");
        response.setHeader("Content-Disposition", String.format("attachment; filename=\"Presupuestos.pdf\""));

        try {
            OutputStream out = response.getOutputStream();
            JasperExportManager.exportReportToPdfStream(jasperPrint, out);
        } catch (Exception e) {
            //TODO: handle exception
        }
    }

}
